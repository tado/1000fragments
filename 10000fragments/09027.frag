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
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.72 + jf * 4.0), cos(t * 0.26 * jf)) * 0.72;
        xs += sin(length(p - im) * 100.51 - t * 4.94 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.37;
	p = rot2(length(p) * -2.90 + time * 0.41) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.02 + time * 0.06, vec3(0.44, 0.47, 0.48), vec3(0.37, 0.43, 0.41), vec3(1.10, 1.12, 1.20), vec3(0.46, 0.65, 0.84));
	col = clamp((col - 0.5) * 2.14 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
