uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 4.78 * sin(t * 0.46) + t * 5.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.56;
	{ p = vec2(atan(p.y, p.x) * 1.25, length(p) * 4.21 - time * 0.87); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(1.49) * p;
	p = (floor(p * 10.7) + 0.5) / 10.7;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.11, 0.01, 0.37), vec3(0.55, 0.85, 0.97), d);
	col = mod(col * 2.48, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
