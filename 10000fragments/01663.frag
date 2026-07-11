uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.44 - t * 5.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.09, length(p) * 3.44 - time * 0.27); }
	p = abs(p);
	p += vec2(0.97, -0.21) * sin(length(p) * 4.61 - time * 1.54) * 0.34;
	p *= 1.36;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.00, vec3(0.51, 0.53, 0.52), vec3(0.43, 0.48, 0.50), vec3(0.76, 1.07, 1.14), vec3(0.02, 0.11, 0.90));
	col = fract(col * 1.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
