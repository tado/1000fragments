uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.37 + jf * 4.0), cos(t * 0.45 * jf)) * 0.40;
        xs += sin(length(p - im) * 72.01 - t * 8.86 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.73 + t * 3.86 + ph) * 0.7;
    float wb = sin(p.y * 9.93 - t * 3.26 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.34;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.47;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.87; }
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 1.92));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.37);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.97 + time * 0.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
