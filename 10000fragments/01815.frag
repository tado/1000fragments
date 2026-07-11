uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.38 + sr * 23.55 - t * 2.35 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.47;
	p += vec2(-0.89, -0.84) * sin(length(p) * 2.91 - time * 0.74) * 0.26;
	p = rot2(time * -1.17) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.77 + time * 0.20, vec3(0.56, 0.54, 0.52), vec3(0.49, 0.43, 0.44), vec3(1.17, 1.20, 1.38), vec3(0.15, 0.69, 0.69));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
