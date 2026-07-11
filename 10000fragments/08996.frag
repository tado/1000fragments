uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.18 + jf * 4.0), cos(t * 0.32 * jf)) * 0.92;
        xs += sin(length(p - im) * 198.32 - t * 8.79 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.24 + vec2(t * 1.98, -t * 1.98) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.57;
	{ p = vec2(atan(p.y, p.x) * 1.74, length(p) * 2.47 - time * 0.51); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.65);
	float d = d1 * d2;
	vec3 col = palette(d * 1.06 + time * 0.17, vec3(0.40, 0.55, 0.51), vec3(0.39, 0.49, 0.39), vec3(1.04, 1.31, 0.89), vec3(0.91, 0.66, 0.46));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
