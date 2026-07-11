uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.37 + sin(p.y * 3.44 + t * 5.89) * 3.26 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.32 + jf * 4.0), cos(t * 0.28 * jf)) * 0.81;
        xs += sin(length(p - im) * 132.58 - t * 13.51 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.54;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.19; p = rot2(2.34) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.14, length(p) * 3.87 - time * 0.51); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.69);
	float d = d1 + d2;
	vec3 col = palette(d * 1.05 + time * 0.29, vec3(0.41, 0.43, 0.48), vec3(0.33, 0.38, 0.44), vec3(0.80, 1.03, 1.08), vec3(0.98, 0.80, 0.40));
	col = clamp((col - 0.5) * 1.45 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
