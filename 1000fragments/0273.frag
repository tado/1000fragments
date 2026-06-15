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
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.49 + jf * 4.0), cos(t * 0.56 * jf)) * 0.53;
        xs += sin(length(p - im) * 136.08 - t * 7.93 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.50;
	p = abs(p);
	p = fract(p * 2.21) - 0.5;
	p = rot2(time * -0.92) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.24, vec3(0.50, 0.60, 0.51), vec3(0.47, 0.39, 0.40), vec3(1.04, 1.33, 0.97), vec3(0.98, 0.80, 0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
