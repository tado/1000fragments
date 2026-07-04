uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.29 + t * 0.30) - 0.5) * 2.0;
    v = sin((p.y * 6.27 + zx * 1.73 + t * 2.49) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.20), cos(time * 0.40)) * 0.18;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.20 / 3.1415927, 1.34 / r + time * 1.01);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.14 + time * 0.02);
	col *= clamp(r * 2.22, 0.0, 1.0);
	col = fract(col * 1.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
