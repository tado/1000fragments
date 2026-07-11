uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.26 + sr * 10.50 - t * 1.32 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 1.87;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.54 + time * 0.11, vec3(0.40, 0.46, 0.57), vec3(0.36, 0.40, 0.33), vec3(1.26, 1.01, 0.76), vec3(0.21, 0.20, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
