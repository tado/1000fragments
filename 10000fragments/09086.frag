uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.91 + sr * 7.62 - t * 3.86 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.89 + jf * 4.0), cos(t * 0.42 * jf)) * 0.74;
        xs += sin(length(p - im) * 189.21 - t * 8.95 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.03;
	p += vec2(-0.40, -0.28) * sin(length(p) * 3.14 - time * 1.28) * 0.26;
	p = fract(p * 2.54) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.35);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.32 + time * 0.15, vec3(0.58, 0.41, 0.46), vec3(0.45, 0.43, 0.38), vec3(1.37, 1.28, 0.90), vec3(0.80, 0.56, 0.26));
	col = fract(col * 1.56);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
