uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 7.35 * sin(t * 0.61) + t * 1.13 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.66, length(p) * 2.50 - time * 0.31); }
	p *= 2.21;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.16 + time * 0.11, vec3(0.52, 0.56, 0.50), vec3(0.36, 0.45, 0.34), vec3(1.23, 0.85, 1.01), vec3(0.36, 0.44, 0.43));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
