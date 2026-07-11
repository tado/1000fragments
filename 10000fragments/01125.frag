uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.29 + t * 0.63 + ph) + sin(p.y * 11.90 - t * 0.63 + ph)
        + sin((p.x + p.y) * 3.71 + t * 0.63 + ph) + sin(length(p) * 4.53 - t * 0.63 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.84;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.60 + time * 0.26, vec3(0.44, 0.53, 0.46), vec3(0.38, 0.42, 0.31), vec3(1.39, 0.97, 1.21), vec3(0.21, 0.63, 0.32));
	col = mod(col * 1.98, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
