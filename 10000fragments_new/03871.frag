uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.91 * sin(mf + 3.0) + ph), cos(t * 0.62 * cos(mf + 3.0) + ph));
        ms += 0.047 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.57 + sin(p.y * 1.23 + t * 0.56) * 4.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 3.49 + time * 3.31) * 0.24;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.68);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.29));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.87 + time * 0.10);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.04;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
