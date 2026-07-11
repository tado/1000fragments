uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.24 + 0.49 * sin(t * 0.90)) + vec2(-0.51, 0.09) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 25; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 25.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.72 + sr * 22.24 - t * 2.12 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.0 + 0.14 * sin(time * 3.25);
	q1 = rot2(2.35) * q1;
	q2 += vec2(0.53, 0.42) * sin(length(q2) * 3.37 - time * 2.44) * 0.20;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.05);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.62 + time * 0.12);
	col *= 0.88 + 0.10 * sin(gl_FragCoord.y * 2.39 + time * 16.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
