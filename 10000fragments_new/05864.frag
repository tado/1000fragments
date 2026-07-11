uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.38 + sin(p.y * 1.21 + t * 3.00) * 2.51 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.27 / 3.1415927, 0.98 / r - time * 1.98);
	tv.x += tv.y * 0.21;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.27 + time * 0.20);
	col *= clamp(r * 2.38, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
