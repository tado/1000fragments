uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.56);
    float gsh = hash21(vec2(grow, floor(t * 8.07))) - 0.5;
    float gx = p.x + gsh * 0.81;
    v = sin(gx * 18.16 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.43));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.68 + t * 3.90 + ph) + sin(p.y * 10.11 - t * 5.14 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.99);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.96, 0.94, 0.67) * (0.22 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
