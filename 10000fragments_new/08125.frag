uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.40 + t * 2.10 + ph) + sin(p.y * 11.53 - t * 2.10 + ph)
        + sin((p.x + p.y) * 2.74 + t * 2.10 + ph) + sin(length(p) * 6.83 - t * 2.10 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.82);
    float gsh = hash21(vec2(grow, floor(t * 4.70))) - 0.5;
    float gx = p.x + gsh * 0.86;
    v = sin(gx * 14.76 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.82));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.59;
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 3.06 + time * 1.05) * 0.14;
	q1 = rot2(q1.y * -3.09 + time * 0.38) * q1;
	q2.y += sin(q2.x * 4.01 + time * 2.04) * 0.12;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.11);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.78, 0.30, 0.93) * (0.10 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= 0.85 + 0.11 * sin(gl_FragCoord.y * 2.07 + time * 5.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
