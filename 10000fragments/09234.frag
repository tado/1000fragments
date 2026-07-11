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
        vec2 im = vec2(sin(t * 0.48 + jf * 4.0), cos(t * 0.44 * jf)) * 0.46;
        xs += sin(length(p - im) * 96.11 - t * 6.52 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.29 + sin(p.y * 2.04 + t * 3.64) * 2.90 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.27;
	p = abs(p) - 0.53;
	p = fract(p * 1.61) - 0.5;
	p = rot2(1.51) * p;
	{ float fr = length(p); p *= 1.0 + 0.58 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.06);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.78 + time * 0.05, vec3(0.44, 0.41, 0.52), vec3(0.45, 0.33, 0.30), vec3(0.76, 1.33, 0.75), vec3(0.16, 0.30, 0.23));
	col = clamp((col - 0.5) * 2.03 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
