uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.66 + 0.24 * sin(t * 0.68)) + vec2(-0.36, -0.03) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 32; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 32.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.69 + t * 3.82 + ph) + sin(p.y * 9.67 - t * 3.82 + ph)
        + sin((p.x + p.y) * 3.16 + t * 3.82 + ph) + sin(length(p) * 4.22 - t * 3.82 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 2.06));
	q1 = rot2(time * -0.41) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.62);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.51));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.72 + time * 0.06);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
