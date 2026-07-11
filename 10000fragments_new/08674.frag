uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.44 + t * 0.92 + ph) + sin(p.y * 5.38 - t * 0.92 + ph)
        + sin((p.x + p.y) * 10.65 + t * 0.92 + ph) + sin(length(p) * 7.50 - t * 0.92 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.15 + 0.15 * sin(t * 0.90)) + vec2(-0.79, -0.26) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 32; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.96;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 20.9) + 0.5) / 20.9;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.16);
	float d = d1 * d2;
	vec3 col = palette(d * 1.37 + time * 0.06, vec3(0.42, 0.47, 0.57), vec3(0.35, 0.47, 0.34), vec3(1.08, 0.84, 1.29), vec3(0.77, 0.34, 0.35));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
