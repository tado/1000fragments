uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 18.40 - t * 5.76 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 34.60 - t * 6.58 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.53;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.75 / 3.1415927, 0.52 / r + time * 2.30);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.40 + time * 0.25);
	col *= clamp(r * 1.81, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
