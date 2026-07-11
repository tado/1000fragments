uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.36 + ga * 4.0 - t * 2.69 + ph);
    v = arm * exp(-gr * 0.71);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.20 / 3.1415927, 1.49 / r + (time * 0.78) * 0.91);
	float d = field(tv, (time * 0.78), 0.0);
	vec3 col = vec3(0.46, 0.59, 0.56) * (0.07 / (abs((d)) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 1.94, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(0.948, 0.994, 1.046) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
