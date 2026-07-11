uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 22.72 - t * 2.93 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 14.65 - t * 3.39 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.75), cos(time * 0.87)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.99 / 3.1415927, 1.07 / r + time * 1.84);
	tv.x += tv.y * 0.27;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.45 + time * 0.12);
	col *= clamp(r * 1.87, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
