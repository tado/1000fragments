uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 22.94 - t * 2.69 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 8.18 - t * 2.69 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.47;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.87, -0.30) * sin(length(p) * 2.71 - time * 1.98) * 0.18;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.82 + time * 0.25, vec3(0.58, 0.55, 0.51), vec3(0.44, 0.44, 0.32), vec3(1.31, 1.18, 1.35), vec3(0.43, 0.87, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
