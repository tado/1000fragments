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
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.46 + jf * 4.0), cos(t * 0.15 * jf)) * 0.95;
        xs += sin(length(p - im) * 109.70 - t * 10.24 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	p = rot2(1.53) * p;
	p = fract(p * 2.30) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.76 + time * 0.08, vec3(0.46, 0.54, 0.43), vec3(0.42, 0.36, 0.34), vec3(1.22, 1.27, 1.03), vec3(0.42, 0.96, 0.29));
	col = fract(col * 2.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
