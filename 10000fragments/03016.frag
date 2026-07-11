uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.52 + vec2(t * 1.05, -t * 1.05) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.86, -0.63) * sin(length(p) * 4.21 - time * 1.39) * 0.24;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.61 + time * 0.29);
	col = mod(col * 2.41, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
