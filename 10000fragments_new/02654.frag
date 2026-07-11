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
    float grow = floor(p.y * 15.45);
    float gsh = hash21(vec2(grow, floor(t * 5.18))) - 0.5;
    float gx = p.x + gsh * 0.92;
    v = sin(gx * 15.19 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.43));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.08) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.97 + time * 0.01, vec3(0.45, 0.46, 0.46), vec3(0.48, 0.37, 0.45), vec3(0.89, 1.21, 1.09), vec3(0.58, 0.35, 0.51));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
