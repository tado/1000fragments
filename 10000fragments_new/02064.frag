uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.47 + vec2(t * 2.32, -t * 0.85) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.49 + jf * 4.0), cos(t * 0.15 * jf)) * 0.86;
        xs += sin(length(p - im) * 98.03 - t * 4.16 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.60;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 1.55 + time * 0.84) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.23);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.60 + time * 0.75);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
