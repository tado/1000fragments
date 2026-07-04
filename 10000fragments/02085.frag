uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.11 + t * 4.72 + ph) + sin(p.y * 6.45 - t * 4.72 + ph)
        + sin((p.x + p.y) * 4.04 + t * 4.72 + ph) + sin(length(p) * 11.43 - t * 4.72 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.83 + 0.20 * sin(t * 0.46)) + vec2(-0.57, 0.25) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 32; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.87;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2 += vec2(-0.46, -0.54) * sin(length(q2) * 3.85 - time * 1.59) * 0.31;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.66);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 1.12 + time * 0.29);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
