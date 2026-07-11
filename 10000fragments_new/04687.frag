uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 4.97 * sin(t * 1.19) + t * 2.07 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.54);
    float gsh = hash21(vec2(grow, floor(t * 7.06))) - 0.5;
    float gx = p.x + gsh * 0.78;
    v = sin(gx * 17.46 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.96));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 1.68, length(p) * 5.37 - time * 0.57); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.48);
	float d = d1 + d2;
	vec3 col = palette(d * 0.77 + time * 0.25, vec3(0.48, 0.58, 0.48), vec3(0.37, 0.39, 0.32), vec3(0.87, 1.02, 1.28), vec3(0.07, 0.39, 0.02));
	col = fract(col * 1.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
