uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 2.60 * sin(t * 0.73) + t * 1.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.62;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.39 + time * 0.27);
	col = mod(col * 2.56, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
