uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.79 + jf * 4.0), cos(t * 0.39 * jf)) * 0.99;
        xs += sin(length(p - im) * 75.50 - t * 8.52 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.99 + sr * 4.12 - t * 1.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(0.35, -0.87) * sin(length(q1) * 3.71 - time * 1.07) * 0.27;
	q1 = rot2(q1.y * 1.51 + time * 1.16) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.19);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.39, 0.16, 0.05), vec3(0.92, 0.97, 0.66), cc);
	col = fract(col * 1.66);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
