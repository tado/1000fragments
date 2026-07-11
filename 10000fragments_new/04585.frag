uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.61 + sr * 21.85 - t * 3.94 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.98 + 0.19 * sin(t * 0.41)) + vec2(-0.25, -0.12) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 19; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 19.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.02;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 1.09) * q1;
	q1 = fract(q1 * 1.55) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.68);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.33));
	vec3 col = vec3(0.17, 0.31, 0.45) * (0.10 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
