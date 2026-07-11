uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.65 - t * 0.58;
    v = sin(floor(lv * 2.2) / 2.2 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.46 + jf * 4.0), cos(t * 0.15 * jf)) * 0.75;
        xs += sin(length(p - im) * 87.09 - t * 6.91 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.19;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * -1.42) * q1;
	q2 = rot2(q2.y * 2.10 + time * 0.93) * q2;
	q2 *= 1.0 + 0.28 * sin(time * 1.11);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.88);
	float d = max(d1, d2);
	vec3 col = hue(d * 1.43 + time * 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
