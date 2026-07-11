uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.73 + t * 4.28 + ph) + sin(p.y * 7.55 - t * 4.28 + ph)
        + sin((p.x + p.y) * 10.75 + t * 4.28 + ph) + sin(length(p) * 16.96 - t * 4.28 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.87);
    float gsh = hash21(vec2(grow, floor(t * 5.43))) - 0.5;
    float gx = p.x + gsh * 0.63;
    v = sin(gx * 8.65 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.52));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.37;
	p = rot2(2.58) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.08);
	float d = d1 + d2;
	vec3 col = palette(d * 1.79 + time * 0.01, vec3(0.51, 0.54, 0.47), vec3(0.39, 0.46, 0.34), vec3(1.08, 1.15, 1.32), vec3(0.17, 0.14, 0.43));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.14 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
