uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.93 + 0.42 * sin(t * 0.69)) + vec2(-0.74, 0.10) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 31; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 31.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.47 + 0.20 * cos(sa * 3.0 + t * 2.03 + ph);
    v = sin((sr - petal) * 6.52);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.06;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 0.95) * q1;
	q2 = abs(q2);
	q2.x += sin(q2.y * 2.32 + time * 1.25) * 0.34;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.96);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.19 + time * 0.21, vec3(0.48, 0.41, 0.52), vec3(0.49, 0.33, 0.41), vec3(0.97, 1.08, 0.76), vec3(0.46, 0.45, 0.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
