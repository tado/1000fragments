uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.44, 0.0)) * 14.90 - t * 4.68 + ph);
    float mb = sin(length(p + vec2(0.44, 0.0)) * 15.88 - t * 1.57 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.44;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.34 / 3.1415927, 0.31 / r - time * 2.44);
	tv.x += tv.y * 0.16;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.22 + time * 0.01);
	col *= clamp(r * 3.00, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
