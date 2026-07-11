uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.58 + 0.47 * sin(t * 0.87)) + vec2(-0.49, 0.21) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 16; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 16.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.12 * cos(sa * 7.0 + t * 0.68 + ph);
    v = sin((sr - petal) * 17.55);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.56;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.77) - 0.5;
	q1 = rot2(q1.y * 3.81 + time * 0.61) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.36);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.39, 0.23, 0.14), vec3(0.57, 0.60, 0.61), cc);
	col = mod(col * 2.24, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
