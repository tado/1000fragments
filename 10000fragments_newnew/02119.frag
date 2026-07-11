uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 9.52 - t * 6.44 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 15.97 - t * 1.53 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.71) - 0.5;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.68;
	p = (floor(p * 18.6) + 0.5) / 18.6;
	p *= 2.57;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.56 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
