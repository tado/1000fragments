uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.06 + 0.39 * sin(t * 1.42)) + vec2(-0.75, -0.27) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 29; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 29.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.72 + t * 0.71 + ph) + sin(p.y * 9.37 - t * 0.71 + ph)
        + sin((p.x + p.y) * 7.59 + t * 0.71 + ph) + sin(length(p) * 6.25 - t * 0.71 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -1.04 + time * 0.31) * q1;
	q2 = rot2(length(q2) * 3.68 + time * 1.45) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.31);
	float d = d1 * d2;
	vec3 col = hue(d * 1.18 + time * 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
