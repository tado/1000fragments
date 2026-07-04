uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.66);
    float gsh = hash21(vec2(grow, floor(t * 4.81))) - 0.5;
    float gx = p.x + gsh * 1.06;
    v = sin(gx * 18.63 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.87));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 35.70 - t * 8.22 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.24;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.56);
	float d = max(d1, d2);
	vec3 col = hue(d * 0.42 + time * 0.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
