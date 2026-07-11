uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.18 + jf * 4.0), cos(t * 0.26 * jf)) * 0.63;
        xs += sin(length(p - im) * 103.17 - t * 5.78 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.61 * sin(mf + 3.0) + ph), cos(t * 0.56 * cos(mf + 3.0) + ph));
        ms += 0.069 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.61;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 1.83 + time * 1.00) * q1;
	q2 = rot2(time * 1.42) * q2;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.88; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.62);
	float d = d1 * d2;
	vec3 col = hue(d * 1.01 + time * 0.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
