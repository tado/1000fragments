uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.52, 0.0)) * 22.11 - t * 6.38 + ph);
    float mb = sin(length(p + vec2(0.52, 0.0)) * 13.03 - t * 6.38 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.02 + vec2(t * 1.50, -t * 1.50) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.63;
	p = rot2(p.y * -1.75 + time * 0.79) * p;
	p = fract(p * 2.27) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.28, length(p) * 3.00 - time * 0.37); }
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.30);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.55 + time * 0.18, vec3(0.54, 0.43, 0.57), vec3(0.41, 0.32, 0.30), vec3(1.32, 1.09, 1.35), vec3(0.66, 0.79, 0.24));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
