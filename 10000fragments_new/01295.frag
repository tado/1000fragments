uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 4.89 + t * 2.27 + ph) * 0.7;
    float wb = sin(p.y * 15.58 - t * 2.40 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.70;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.67), cos(time * 1.33)) * 0.26;
	float an = atan(p.y, p.x) + time * -0.27;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.44 / 3.1415927, 0.64 / r + time * 2.12);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.53, 0.63, 0.95) * (0.21 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 1.67, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
