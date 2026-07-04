uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 6.49 + ga * 2.0 - t * 1.79 + ph);
    v = arm * exp(-gr * 0.89);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.21 + jf * 4.0), cos(t * 0.46 * jf)) * 0.73;
        xs += sin(length(p - im) * 212.70 - t * 11.71 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(1.65) * q1;
	q2 = rot2(q2.y * 1.57 + time * 0.74) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.15);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 0.68 + time * 0.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
