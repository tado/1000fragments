uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.68 + sin(p.y * 3.44 + t * 3.69) * 3.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	{ p = vec2(atan(p.y, p.x) * 2.37, length(p) * 4.62 - time * 0.39); }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.59;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.90));
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.52, 0.96, 1.54) + vec3(0.20, 0.12, 0.27);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
