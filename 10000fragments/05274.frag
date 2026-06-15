uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.56 + jf * 4.0), cos(t * 0.28 * jf)) * 0.92;
        xs += sin(length(p - im) * 65.75 - t * 6.95 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.43;
	p = rot2(0.77) * p;
	{ p = vec2(atan(p.y, p.x) * 1.38, length(p) * 2.44 - time * 0.73); }
	p = fract(p * 1.36) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.96 + time * 0.14, vec3(0.55, 0.53, 0.48), vec3(0.43, 0.40, 0.41), vec3(0.98, 0.89, 0.83), vec3(0.48, 0.92, 0.54));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
