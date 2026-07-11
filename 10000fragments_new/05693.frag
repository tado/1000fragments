uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.18 + t * 0.60 + ph) * 0.7;
    float wb = sin(p.y * 10.83 - t * 2.98 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.60;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.52) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.76, length(p) * 3.93 - time * 0.48); }
	p = abs(p) - 0.73;
	p += vec2(-0.78, -0.30) * sin(length(p) * 4.07 - time * 1.37) * 0.37;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.73, 0.53, 0.77) * (0.21 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
