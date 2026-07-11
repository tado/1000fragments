uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.86);
    float gsh = hash21(vec2(grow, floor(t * 2.91))) - 0.5;
    float gx = p.x + gsh * 1.12;
    v = sin(gx * 10.76 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.28));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.17 + 0.43 * sin(t * 1.13)) + vec2(-0.26, 0.18) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 29; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 29.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q2 = abs(q2) - 0.22;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.82);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.20 + time * 0.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
