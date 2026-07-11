uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.89 + sr * 14.68 - t * 1.60 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.14);
    float gsh = hash21(vec2(grow, floor(t * 5.17))) - 0.5;
    float gx = p.x + gsh * 0.49;
    v = sin(gx * 9.13 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.78));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.13);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.31 + time * 0.09, vec3(0.46, 0.51, 0.53), vec3(0.36, 0.36, 0.39), vec3(1.13, 0.99, 0.86), vec3(0.79, 0.33, 0.12));
	col = mod(col * 1.93, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
