uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.58 + 0.31 * pow(abs(cos(ra * 3.0 + t * 2.38)), 1.07);
    v = sin((rr - pet) * 14.42 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 15.95);
    float gsh = hash21(vec2(grow, floor(t * 7.28))) - 0.5;
    float gx = p.x + gsh * 0.67;
    v = sin(gx * 11.82 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.96));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.51;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.94);
	float d = d1 * d2;
	vec3 col = palette(d * 1.36 + time * 0.06, vec3(0.59, 0.42, 0.53), vec3(0.34, 0.47, 0.41), vec3(0.94, 1.32, 1.18), vec3(0.13, 0.62, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
