uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.13 * sin(mf + 3.0) + ph), cos(t * 1.03 * cos(mf + 3.0) + ph));
        ms += 0.092 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.92);
    float gsh = hash21(vec2(grow, floor(t * 5.18))) - 0.5;
    float gx = p.x + gsh * 0.89;
    v = sin(gx * 13.53 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.33));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.54;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.15);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.02 + time * 0.18, vec3(0.60, 0.41, 0.54), vec3(0.48, 0.47, 0.42), vec3(1.03, 0.99, 1.35), vec3(0.21, 0.94, 0.08));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.94 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
