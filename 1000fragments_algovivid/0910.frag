uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.46 + t * 1.15 + ph) * 0.7;
    float wb = sin(p.y * 12.03 - t * 3.02 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.50;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.69) * 1.49), cos((time * 0.69) * 0.46)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.09 / 3.1415927, 0.83 / r - (time * 0.69) * 2.60);
	float d = field(tv, (time * 0.69), 0.0);
	vec3 col = vec3(0.54, 0.64, 0.48) * (0.11 / (abs((d)) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.98, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.36));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col = clamp(col, 0.0, 1.0) * vec3(0.982, 1.009, 0.990) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
